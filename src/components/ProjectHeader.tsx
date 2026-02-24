import React from 'react';

const PROJECT_HEADER_LAYOUT = {
  metaLeftColWidth: 220,
  toolsColWidth: 220,
  dividerOffsetX: -56,
  toolsOffsetX: -73,
  descriptionOffsetX: 224,
  descriptionMaxWidth: 640,
} as const;

type ProjectHeaderProps = {
  title: string;
  timeline: string;
  tools: string[];
  role: string;
  reference?: string;
  referenceLabel?: string;
  category?: string;
  link?: string | string[];
  linkUrls?: Record<string, string>;
  dividerHeight?: number;
  roleLabel?: string;
  titleUnderlineColor?: string;
  titleUnderlineWidth?: number | string;
  titleFontSize?: number;
  description: string[];
};

/**
 * Reusable project hero/header block.
 * Layout: large title on left, meta columns below, description on right.
 */
export default function ProjectHeader({
  title,
  timeline,
  tools,
  role,
  reference,
  referenceLabel = 'Reference',
  category,
  link,
  linkUrls,
  dividerHeight = 200,
  roleLabel = 'Project role',
  titleUnderlineColor,
  titleUnderlineWidth = 420,
  titleFontSize = 160,
  description,
}: ProjectHeaderProps) {
  const linkItems = Array.isArray(link) ? link : link ? [link] : [];

  return (
    <section className="relative px-7 pt-48 pb-12 text-black-normal">
      <h1
        className={`type-title-1 leading-[0.9] -ml-3 ${titleUnderlineColor ? 'mb-1' : 'mb-12'}`}
        style={{ fontSize: titleFontSize }}
      >
        {title}
      </h1>
      {titleUnderlineColor && (
        <div
          className="h-[3px] mb-12"
          style={{ width: titleUnderlineWidth, backgroundColor: titleUnderlineColor }}
          aria-hidden
        />
      )}

      <div
        className="grid gap-8 items-start"
        style={{ gridTemplateColumns: `${PROJECT_HEADER_LAYOUT.metaLeftColWidth}px 1px ${PROJECT_HEADER_LAYOUT.toolsColWidth}px 1fr` }}
      >
        {/* Left meta column */}
        <div className="grid gap-6">
          {category && (
            <div>
              <p className="m-0 type-category text-black-normal">Category</p>
              <p className="m-0 type-body-lg text-black-normal">{category}</p>
            </div>
          )}
          <div>
            <p className="m-0 type-category text-black-normal">Timeline</p>
            <p className="m-0 type-body-lg text-black-normal">{timeline}</p>
          </div>
          <div>
            <p className="m-0 type-category text-black-normal">{roleLabel}</p>
            <p className="m-0 type-body-lg text-black-normal">{role}</p>
          </div>
          {reference && (
            <div>
              <p className="m-0 type-category text-black-normal">{referenceLabel}</p>
              <p className="m-0 type-body-lg text-black-normal">{reference}</p>
            </div>
          )}
          {linkItems.length > 0 && (
            <div>
              <p className="m-0 type-category text-black-normal">Link</p>
              {linkItems.map((item) => (
                linkUrls?.[item] ? (
                  <a
                    key={item}
                    href={linkUrls[item]}
                    target="_blank"
                    rel="noreferrer"
                    className="block m-0 type-body-lg text-black-normal leading-[1.35]"
                  >
                    {item}
                  </a>
                ) : (
                  <p key={item} className="m-0 type-body-lg text-black-normal leading-[1.35]">
                    {item}
                  </p>
                )
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div
          className="border-l border-black/60"
          style={{ height: dividerHeight, transform: `translateX(${PROJECT_HEADER_LAYOUT.dividerOffsetX}px)` }}
        />

        {/* Tools column */}
        <div className="text-[12px] leading-[1.6]" style={{ marginLeft: PROJECT_HEADER_LAYOUT.toolsOffsetX }}>
          {tools.map((tool) => (
            <p key={tool} className="m-0 type-body text-black-normal">
              {tool}
            </p>
          ))}
        </div>
        {/* Description column */}
        <div
          className="type-body-lg leading-[1.6] text-black-normal"
          style={{ maxWidth: PROJECT_HEADER_LAYOUT.descriptionMaxWidth, marginLeft: PROJECT_HEADER_LAYOUT.descriptionOffsetX }}
        >
          {description.map((line) => (
            <p key={line} className="m-0 mb-0 last:mb-0">
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
