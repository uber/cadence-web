import { type NextRequest } from 'next/server';

import { listTaskListsByDomain } from '@/route-handlers/list-task-lists-by-domain/list-task-lists-by-domain';
import type { RouteParams } from '@/route-handlers/list-task-lists-by-domain/list-task-lists-by-domain.types';

export async function GET(
  request: NextRequest,
  { params }: { params: RouteParams }
) {
  return listTaskListsByDomain(request, { params });
}
