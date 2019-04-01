import * as React from 'react';
import { Link } from 'react-router-dom';

export const Navigation = () => (
  <nav>
    <ul>
      <li>
        <Link to="/radio/">Radio</Link>
      </li>
      <li>
        <Link to="/tv/">TV</Link>
      </li>
    </ul>
  </nav>
);
