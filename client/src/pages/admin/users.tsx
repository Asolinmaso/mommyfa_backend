import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useQuery } from '@tanstack/react-query';
import { User as UserType } from '@shared/schema';
import { 
  Users, Search, PlusCircle, Trash2, Edit, MoreHorizontal, Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AdminHeader from '@/components/layout/admin-header';

const UsersPage = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string | null>(null);

  // Fetch users data
  const { data: users = [], isLoading } = useQuery<UserType[]>({
    queryKey: ['/api/users'],
  });

  // Filter users based on search term and role filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === '' || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === null || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  // Handle user actions
  const handleEditUser = (userId: string) => {
    console.log(`Edit user with ID: ${userId}`);
    // Implement edit functionality
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      console.log(`Delete user with ID: ${userId}`);
      // Implement delete functionality
    }
  };

  const handleAddUser = () => {
    console.log('Add new user');
    // Implement add user functionality
  };

  // Redirect if not admin
  if (!user || user.role !== 'admin') {
    return <div className="p-8 text-center">You don't have permission to access this page.</div>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AdminHeader />
      
      <main className="flex-1 p-6">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
              <p className="text-muted-foreground">View and manage all users on the platform</p>
            </div>
            <Button onClick={handleAddUser}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search users..." 
                  className="w-full pl-8" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    {roleFilter ? `Role: ${roleFilter.charAt(0).toUpperCase() + roleFilter.slice(1)}` : 'All Roles'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by Role</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setRoleFilter(null)}>All Roles</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRoleFilter('admin')}>Admin</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRoleFilter('seller')}>Seller</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRoleFilter('buyer')}>Buyer</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="text-sm text-muted-foreground">
              {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'} found
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <div className="text-center">
                <Users className="mx-auto h-10 w-10 text-muted-foreground animate-pulse" />
                <p className="mt-2 text-sm text-muted-foreground">Loading users...</p>
              </div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Users Found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {searchTerm || roleFilter ? 'Try adjusting your search or filters' : 'Get started by adding your first user'}
                </p>
                {!searchTerm && !roleFilter && (
                  <Button onClick={handleAddUser}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New User
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="rounded-md border">
                  <div className="grid grid-cols-6 p-3 text-sm font-medium bg-muted/50">
                    <div>Name</div>
                    <div>Email</div>
                    <div>Role</div>
                    <div>Joined</div>
                    <div>Status</div>
                    <div className="text-right">Actions</div>
                  </div>
                  <div className="divide-y">
                    {filteredUsers.map((user) => (
                      <div key={user.id} className="grid grid-cols-6 p-3 text-sm">
                        <div className="font-medium">{user.name}</div>
                        <div>{user.email}</div>
                        <div>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 
                            user.role === 'seller' ? 'bg-blue-100 text-blue-800' : 
                            'bg-green-100 text-green-800'
                          }`}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </span>
                        </div>
                        <div>{new Date(user.createdAt).toLocaleDateString()}</div>
                        <div>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        </div>
                        <div className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleEditUser(user.id)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDeleteUser(user.id)}
                                className="text-red-600 focus:text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default UsersPage;