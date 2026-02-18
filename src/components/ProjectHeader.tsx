import React from 'react';

type ProjectHeaderProps = {
  title: string;
  timeline: string;
  tools: string[];
  role: string;
  reference?: string;
  category?: string;
  link?: string;
  description: string[];
};

/**
 * Reusable project hero/header block.
 * Layout: large title on left, meta columns below, description on right.
 */
export default function ProjectHeader({ title, timeline, tools, role, reference, category, link, description }: ProjectHeaderProps) {
  return (
    <section className="relative px-7 pt-48 pb-12 text-black-normal">
      <h1
        className="type-title-1 mb-12 leading-[0.9] -ml-3"
        style={{ fontSize: 160 }}
      >
        {title}
      </h1>

      <div className="grid gap-8 grid-cols-[220px_1px_220px_1fr] items-start">
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
            <p className="m-0 type-category text-black-normal">Project role</p>
            <p className="m-0 type-body-lg text-black-normal">{role}</p>
          </div>
          {reference && (
            <div>
              <p className="m-0 type-category text-black-normal">Reference</p>
              <p className="m-0 type-body-lg text-black-normal">{reference}</p>
            </div>
          )}
          {link && (
            <div>
              <p className="m-0 type-category text-black-normal">Link</p>
              <p className="m-0 type-body-lg text-black-normal">{link}</p>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-[200px] border-l border-black/60 translate-x-[-56px]" />

        {/* Tools column */}
        <div className="text-[12px] leading-[1.6] -ml-16">
          {tools.map((tool) => (
            <p key={tool} className="m-0 type-body text-black-normal">
              {tool}
            </p>
          ))}
        </div>
        {/* Description column */}
        <div className="type-body-lg leading-[1.6] text-black-normal max-w-[640px] ml-56">
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
