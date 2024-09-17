import React from 'react';

import { Button, KIND, SIZE } from 'baseui/button';
import { MdPlayArrow } from 'react-icons/md';

import WorkflowQueriesTileInput from '../workflow-queries-tile-input/workflow-queries-tile-input';

import { styled } from './workflow-queries-tile.styles';
import { type Props } from './workflow-queries-tile.types';

export default function WorkflowQueriesTile(props: Props) {
  return (
    <styled.Tile
      onClick={() => props.onSelect()}
      $isSelected={props.isSelected}
    >
      <styled.Header>
        <styled.Label>
          {props.name}
          {/* TODO: add status icon */}
        </styled.Label>
        <styled.Actions>
          <Button
            size={SIZE.mini}
            kind={KIND.tertiary}
            onClick={() =>
              props.setInput(props.input !== undefined ? undefined : '')
            }
          >
            {props.input !== undefined ? 'Remove input' : 'Add input'}
          </Button>
          <Button
            size={SIZE.compact}
            kind={KIND.secondary}
            endEnhancer={MdPlayArrow}
            onClick={props.runQuery}
          >
            Run
          </Button>
        </styled.Actions>
      </styled.Header>
      {props.input !== undefined && (
        <WorkflowQueriesTileInput
          value={props.input}
          setValue={props.setInput}
        />
      )}
    </styled.Tile>
  );
}
