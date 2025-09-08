"use client";

import * as React from "react";
import { Column, Row, Heading, Text } from "@once-ui-system/core";

type FaqItem = {
  id?: string;
  question: string;
  answer: React.ReactNode;
};

type FaqProps = {
  items: FaqItem[];
  title?: string;
  allowMultiple?: boolean;
  contained?: boolean; // toggles card-like background + border
};

export const Faq: React.FC<FaqProps> = ({
  items,
  title = "Frequently asked questions",
  allowMultiple = false,
  contained = true,
}) => {
  const [open, setOpen] = React.useState<number[]>([]);

  const toggle = (i: number) => {
    setOpen((prev) => {
      const isOpen = prev.includes(i);
      if (allowMultiple) return isOpen ? prev.filter((x) => x !== i) : [...prev, i];
      return isOpen ? [] : [i];
    });
  };

  return (
    <Column fillWidth gap="12">
      <Heading variant="display-strong-xs" marginBottom="s">
        {title}
      </Heading>

      {items.map((item, i) => {
        const expanded = open.includes(i);
        const contentId = `faq-item-${item.id ?? i}-content`;
        const buttonId = `faq-item-${item.id ?? i}-button`;

        return (
          <Column
            key={item.id ?? i}
            padding={contained ? "l" : undefined}
            radius={contained ? "l" : undefined}
            background={contained ? "surface" : undefined}
            border={contained ? "neutral-alpha-weak" : undefined}
          >
            <Row vertical="center" horizontal="between" gap="8">
              <button
                id={buttonId}
                aria-controls={contentId}
                aria-expanded={expanded}
                onClick={() => toggle(i)}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                <Row vertical="center" horizontal="between" gap="8">
                  <Text variant="body-strong-l">{item.question}</Text>
                  <span
                    aria-hidden="true"
                    style={{
                      transform: `rotate(${expanded ? 180 : 0}deg)`,
                      transition: "transform 150ms ease",
                      lineHeight: 1,
                    }}
                  >
                    ▼
                  </span>
                </Row>
              </button>
            </Row>

            {expanded && (
              <Text
                id={contentId}
                marginTop="s"
                variant="body-default-l"
                onBackground="neutral-weak"
              >
                {item.answer}
              </Text>
            )}
          </Column>
        );
      })}
    </Column>
  );
};

// Example usage (drop-in):
// import { faq } from "@/resources/content";
// <FAQ items={faq.questions.map(q => ({ question: q.question, answer: q.answer }))} />
