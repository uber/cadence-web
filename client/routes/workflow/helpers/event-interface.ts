interface eventInfo {
  parent?: number;
  inferredChild?: number;
  chronologicalChild?: number;
  chronologicalParent?: number;
  inferredParents?: number[];
  clickInfo?: object;
  parentWorkflow?: object;
  status?: string
}

interface workflow {
  [index: number]: event
}

interface eventTypeMap {
  [key: string]: any;
}

interface event {
  eventType: string;
  eventId: number;
  [key: string]: any;
}

interface workflow extends Array<event> { }

export { eventInfo, event, workflow, eventTypeMap };