import { NextRequest } from 'next/server';

import type { RouteParams } from '@/handlers/list-workflows/list-workflows.types';
import { listWorkflows } from '@/handlers/list-workflows/list-workflows';

export async function GET(
  request: NextRequest,
  { params }: { params: RouteParams }
) {
  return listWorkflows(request, { params });
}
