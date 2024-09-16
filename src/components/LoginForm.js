import React, { useState, useEffect } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]); // State to store fetched users

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = { email, password };

    try {
      const response = await fetch('http://localhost:5000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log('Server Response:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to fetch all users from the database
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000'); // Assuming the "/" route returns all users
      const data = await response.json();
      setUsers(data); // Update state with fetched users
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Use useEffect to fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="Wrap_login">
      <div className="Login">
        <div className="login_right">
          <div className="login_title">Đăng nhập</div>
          <div className="login_form">
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="abc@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="Btn_Login">Sign in</button>
            </form>
            <div className="Text_login">Quên mật khẩu</div>
            <span>Bạn chưa có tài khoản? </span>
            <span className="Text_login">Tạo tài khoản</span>
          </div>
        </div>

        {/* Display fetched users */}
        <div className="users_list">
          <h2>Registered Users</h2>
          <ul>
            {users.map((user, index) => (
              <li key={index}>
                {user.email} - {user.password}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
