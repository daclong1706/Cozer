import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../redux/slices/adminSlice";

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "customer", // Default
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addUser(formData)).unwrap();
      setFormData({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        role: "customer",
      });
      alert("User added successfully!");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      {/* {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>} */}
      <div className="bg-white p-6 rounded-lg mb-6 shadow-md">
        <h3 className="text-lg font-bold mb-4">Thêm tài khoản</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Họ tên</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-xl border-neutral-300 focus:border-neutral-400 focus:border-2 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-xl border-neutral-300 focus:border-neutral-400 focus:border-2 focus:outline-none"
              required
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-xl border-neutral-300 focus:border-neutral-400 focus:border-2 focus:outline-none"
              required
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col flex-wrap sm:flex-row gap-4 mb-16">
            <div className="flex-1">
              <label className="block text-gray-700 mb-2">Số điện thoại</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded-xl border-neutral-300 focus:border-neutral-400 focus:border-2 focus:outline-none h-10"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 mb-2">Phân quyền</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 border rounded-xl border-neutral-300 focus:border-neutral-400 focus:border-2 focus:outline-none h-10"
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <hr className="my-4 -mx-6 border-neutral-100 border-1" />
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="bg-green-600 text-white py-4 px-8 rounded-xl hover:bg-green-700 my-5"
            >
              Thêm tài khoản
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
