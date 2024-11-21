export type ExampleQuery = {
  label: string;
  text: string;
};

export type DomainWorkflowsQueryTooltipConfig = {
  title: string;
  subtitle: string;
  exampleQueries: Array<ExampleQuery>;
  docsButtonText: string;
  docsLink: string;
};
