import { type Theme } from 'baseui';
import type { TagOverrides } from 'baseui/tag/types';
import { type StyleObject } from 'styletron-react';

import { WorkflowStatusTagOverridesProps } from './workflow-status-tag.types';

export function overrides(props: WorkflowStatusTagOverridesProps) {
  return {
    tag: {
      Root: {
        style: ({ $theme }: { $theme: Theme }): StyleObject => {
          let tagColor: string;
          switch (props.status) {
            case 'running':
              tagColor = $theme.colors.accent100;
              break;
            case 'completed':
              tagColor = $theme.colors.positive100;
              break;
            case 'failed':
            case 'timedOut':
              tagColor = $theme.colors.negative100;
              break;
            case 'canceled':
            case 'terminated':
              tagColor = $theme.colors.warning100;
              break;
            case 'continuedAsNew':
              tagColor = $theme.colors.primary100;
              break;
            default:
              tagColor = $theme.colors.negative100;
              break;
          }

          return {
            color: $theme.colors.contentPrimary,
            backgroundColor: tagColor,
            borderRadius: $theme.borders.radius200,
            height: $theme.sizing.scale600,
            paddingRight: $theme.sizing.scale100,
            paddingLeft: $theme.sizing.scale100,
            paddingTop: 0,
            paddingBottom: 0,
            margin: 0,
          };
        },
      },
      Text: {
        style: ({ $theme }: { $theme: Theme }) => ({
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: $theme.sizing.scale100,
          ...$theme.typography.LabelXSmall,
        }),
      },
    } satisfies TagOverrides,
  };
}
