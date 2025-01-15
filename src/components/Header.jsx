import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={{ padding: '10px', backgroundColor: '#eee' }}>
      <nav>
        <Link to="/">홈</Link> | <Link to="/signup">회원가입</Link>
      </nav>
    </header>
  );
}

export default Header;
