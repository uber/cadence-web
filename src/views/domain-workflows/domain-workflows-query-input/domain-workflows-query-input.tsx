import React, { useEffect, useState } from 'react';

import { Button } from 'baseui/button';
import { Input } from 'baseui/input';
import { MdPlayArrow, MdCode } from 'react-icons/md';

import { overrides } from './domain-workflows-query-input.styles';
import { type Props } from './domain-workflows-query-input.types';

export default function DomainWorkflowsQueryInput({ value, setValue }: Props) {
  const [queryText, setQueryText] = useState<string>('');

  useEffect(() => {
    value && setQueryText(value);
  }, [value]);

  return (
    <>
      <Input
        value={queryText}
        onChange={(event) => {
          setQueryText(event.target.value);
          if (!event.target.value) {
            setValue(undefined);
          }
        }}
        startEnhancer={() => <MdCode />}
        overrides={overrides.input}
        placeholder="Write a custom query for workflows"
        clearable
        clearOnEscape
      />
      <Button
        onClick={() => queryText && setValue(queryText)}
        overrides={overrides.runButton}
        startEnhancer={<MdPlayArrow />}
      >
        Run Query
      </Button>
    </>
  );
}
