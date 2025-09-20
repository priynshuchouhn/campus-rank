import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react'
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import Link from 'next/link';
import { User } from '@prisma/client';
import { getAdminUsers } from '@/lib/actions/users';
async function UsersPage({ searchParams }: { searchParams: Promise<{ page: string; limit: string }> }) {
  try {
    const {page, limit} = await searchParams;
    const result = await getAdminUsers(page,limit);
    if(!result.success || !result.data){
        console.log(result.message)
        return <>Error: {result.message}</>
    }
    const users = result.data.users;
    const pagination = result.data.pagination;
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Users</h1>
            <p className="mt-2 text-gray-600">Manage Users accounts</p>
          </div>
          <Link href="/admin/users/add">
            <Button>
              <Plus className="h-5 w-5 mr-2" />
              Add users
            </Button>
          </Link>
        </div>
        <div className="flex items-center justify-center w-full">
          <DataTable columns={columns} data={users as User[]} pagination={pagination} />
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching students:', error);
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Users</h1>
            <p className="mt-2 text-gray-600">Manage Users accounts</p>
          </div>
          <Link href="/admin/users/add">
            <Button>
              <Plus className="h-5 w-5 mr-2" />
              Add Users
            </Button>
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center w-full gap-4">
          <p className="text-red-500">Error loading users. Please try again later.</p>
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

export default UsersPage;
