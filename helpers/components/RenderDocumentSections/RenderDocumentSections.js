import { arrayOf, shape, func, string } from 'prop-types';
import React from 'react';

import resolveSections from '@/helpers/resolveSections/resolveSections';

const RenderDocumentSections = (props) => {
  const { sections, document, propsHandler, pageType, page, slug, id, type } = props;
  if (!sections) return <div key="missing sections">Missing sections</div>;

  return (
    <>
      {sections.map((section) => {
        const SectionComponent = resolveSections(section);

        if (!SectionComponent) {
          // eslint-disable-next-line no-underscore-dangle
          return <div key="missing section">Missing section {section._type}</div>;
        }

        const extractProps = propsHandler(SectionComponent);
        const sectionProps =
          (extractProps && extractProps(document, section)) ?? section;

        // eslint-disable-next-line no-underscore-dangle
        return (
          <SectionComponent
            {...sectionProps}
            key={section._key}
            pageType={pageType}
            page={page}
            slug={slug.current}
            id={id}
            type={type}
          />
        );
      })}
    </>
  );
};

RenderDocumentSections.propTypes = {
  sections: arrayOf(shape({})),
  document: shape({}),
  propsHandler: func,
  pageType: string,
  page: string,
  slug: shape({}),
  id: string,
  type: string,
};

// noinspection JSUnusedLocalSymbols
RenderDocumentSections.defaultProps = {
  sections: [],
  document: {},
  // eslint-disable-next-line no-unused-vars
  propsHandler: (Component) => undefined,
  pageType: '',
  page: '',
  slug: {},
  id: '',
  type: '',
};

export default RenderDocumentSections;
