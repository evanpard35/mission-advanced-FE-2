// components/UserListView.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../store/redux/apiSlice';
import { getUser } from '../services/api/userService';

const UserListView = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.api.users);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userData = await getUser();
                dispatch(setUsers(userData));
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [dispatch]);

    return (
        <div>
            <h2>Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserListView;
