"use client";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { User } from "@/db/schema"; // Adjust the import based on your actual schema file location
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client"; 

export default function UsersTable() {
	const [users, setUsers] = useState<User[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				setIsLoading(true);
				console.log("Fetching users...");
				const response = await authClient?.admin.listUsers({
					query: { limit: 10 },
				});

				if (response?.data) {
					setUsers(response.data.users as User[]);
				}
			} catch (err) {
				setError(
					err instanceof Error ? err : new Error("Failed to fetch users")
				);
			} finally {
				setIsLoading(false);
			}
		};

		fetchUsers();
	}, []);

	if (isLoading) {
		return (
			<div className="flex justify-center p-4">
				<span>Loading users...</span>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center p-4">
				<span className="text-red-500">Error: {error.message}</span>
			</div>
		);
	}

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Role</TableHead>
					<TableHead>Verified</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Joined</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{users.map((user) => (
					<TableRow key={user.id}>
						<TableCell>{user.name}</TableCell>
						<TableCell>{user.email}</TableCell>
						<TableCell>{user.role ?? ""}</TableCell>
						<TableCell>{user.emailVerified ? "Yes" : "No"}</TableCell>
						<TableCell>
							{user.banned ? (
								<span className="text-red-500">Banned</span>
							) : (
								<span className="text-green-500">Active</span>
							)}
						</TableCell>
						<TableCell>
							{new Date(user.createdAt).toLocaleDateString()}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}