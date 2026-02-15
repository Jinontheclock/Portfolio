import React from 'react';

type ProjectHeaderProps = {
  title: string;
  timeline: string;
  tools: string[];
  role: string;
  reference?: string;
  description: string[];
};

/**
 * Reusable project hero/header block.
 * Layout: large title on left, meta columns below, description on right.
 */
export default function ProjectHeader({ title, timeline, tools, role, reference, description }: ProjectHeaderProps) {
  return (
    <section className="relative px-3 tablet:px-5 desktop:px-7 pt-48 pb-12 text-black-normal">
      <h1
        className="type-title-1 mb-12 leading-[0.9] -ml-1 tablet:-ml-2 desktop:-ml-3"
        style={{ fontSize: 160 }}
      >
        {title}
      </h1>

      <div className="grid gap-6 desktop:gap-8 desktop:grid-cols-[220px_1px_220px_1fr] items-start">
        {/* Left meta column */}
        <div className="grid gap-6">
          <div>
            <p className="m-0 type-category text-black-normal">Timeline</p>
            <p className="m-0 type-body-lg text-black-normal">{timeline}</p>
          </div>
          <div>
            <p className="m-0 type-category text-black-normal">Project role</p>
            <p className="m-0 type-body-lg text-black-normal">{role}</p>
          </div>
          {reference && (
            <div>
              <p className="m-0 type-category text-black-normal">Reference</p>
              <p className="m-0 type-body-lg text-black-normal">{reference}</p>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="hidden desktop:block h-full border-l border-black/60 translate-x-[-56px]" />

        {/* Tools column */}
        <div className="text-[12px] leading-[1.6] desktop:-ml-16">
          {tools.map((tool) => (
            <p key={tool} className="m-0 type-body text-black-normal">
              {tool}
            </p>
          ))}
        </div>
        {/* Description column */}
        <div className="type-body-lg leading-[1.6] text-black-normal max-w-3xl desktop:max-w-[640px] desktop:ml-56">
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
