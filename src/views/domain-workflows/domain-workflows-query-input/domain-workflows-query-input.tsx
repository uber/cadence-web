import React from 'react';

import { Button } from 'baseui/button';
import { Input } from 'baseui/input';

export default function DomainWorkflowsQueryInput({
  value,
  setValue,
  onRunButtonClick,
}: {
  value: string;
  setValue: (v: string) => void;
  onRunButtonClick: () => void;
}) {
  return (
    <>
      <Input
        value={value}
        onChange={(event) => {
          setValue(event.target.value.trim());
        }}
        placeholder="Query Workflow"
        clearOnEscape
      />
      <Button onClick={onRunButtonClick} />
    </>
  );
}
