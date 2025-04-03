import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, fetchUsers } from "../../redux/slices/adminSlice";
import TableDesgin from "./TableDesgin";
import TableUser from "./TableUser";

const UserManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { users, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user && user.role === "admin") {
      dispatch(fetchUsers());
    }
  }, [dispatch, user]);

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId));
    }
  };

  if (loading) return <p>loading</p>;
  if (error) return <p>error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <TableDesgin users={users} deleteItem={handleDeleteUser} />
    </div>
  );
};

export default UserManagement;
