import { MAX_NESTING_LEVEL } from '@/utils/constants';

import { configData } from '../config';
import { modulesView } from '../modules';
import { dynamicPageTypesQuery } from '../pages/dynamicPage';
import { seo } from './seo';
import { templateDocument } from './template';

export const previewModules = `{
  "drafts": *[_id in $draftsModulesId],
  "published": *[_id in $allModules]
}`;

export const generateTemplatesQuery = () => {
  const firstCondition = `templateConfig.useTemplate == true && defined(templateConfig.currentPage) => templateConfig.currentPage`;
  const queryArray = [firstCondition];
  let parentString = 'parent';

  for (let i = 0; i <= MAX_NESTING_LEVEL; i++) {
    if (i !== 0) parentString = `parent->${parentString}`;
    const conditionItem = ` defined(${parentString}) && ${parentString}->templateConfig.useTemplate == true && defined(${parentString}->templateConfig.childPages) => ${parentString}->templateConfig.childPages`;
    queryArray.push(conditionItem);
  }

  const lastCondition = `null`;
  queryArray.push(lastCondition);

  return queryArray.join(',');
};

export const previewTemplate = `coalesce(
  select(${generateTemplatesQuery()})->,
  *[_type in $templates && isDefault == true][0]
  )${templateDocument}`;

export const initPreviewPage = `{
  "page": *[_id == "drafts."+$id || _id == $id]{
    _type == "page" => {
      ...,
      ${seo},
      "template": ${previewTemplate},
      "modules": modules[]._ref
    },
    _type in [${dynamicPageTypesQuery}] => {
      ...,
      ${seo},
      "template": ${previewTemplate},
      "modules": {
        "before":parent->dynamicConfig.before []._ref,
        "content": [content ${modulesView}],
        "after":parent->dynamicConfig.after []._ref
      }
    }
  },
  "config": ${configData},
}`;
