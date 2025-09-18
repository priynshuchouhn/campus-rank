import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react'
import { DataTable } from '@/components/ui/data-table';
import Link from 'next/link';
import { columns } from './columns';
import { getAdminQuestions } from '@/lib/actions/questions';
async function QuestionsPage({ searchParams }: { searchParams: Promise<{ page: string; limit: string }> }) {
  try {
    const {page, limit} = await searchParams;
    const result = await getAdminQuestions(page,limit);
    if(!result.success || !result.data){
        console.log(result.message)
        return <>Error: {result.message}</>
    }
    const questions = result.data.questions;
    const pagination = result.data.pagination;
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Questions</h1>
            <p className="mt-2 text-gray-600">Manage Questions</p>
          </div>
          <Link href="/admin/questions/new">
            <Button>
              <Plus className="h-5 w-5 mr-2" />
              Add question
            </Button>
          </Link>
        </div>
        <div className="flex items-center justify-center w-full">
          <DataTable columns={columns} data={questions} pagination={pagination} />
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching students:', error);
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Questions</h1>
            <p className="mt-2 text-gray-600">Manage Questions</p>
          </div>
          <Link href="/admin/questions/new">
            <Button>
              <Plus className="h-5 w-5 mr-2" />
              Add Questions
            </Button>
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center w-full gap-4">
          <p className="text-red-500">Error loading question. Please try again later.</p>
          <form action={async () => {
            'use server';
            return;
          }}>
            <Button type="submit">
              Refresh Page
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

export default QuestionsPage;
