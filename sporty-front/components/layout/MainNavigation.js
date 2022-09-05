import Link from 'next/link';
import classes from './MainNavigation.module.css';

function MainNavigation() {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Sporty</div>
      <nav>
        <ul>
          <li>
            <Link href='/'>현재 게시글</Link>
          </li>
          <li>
            <Link href='/newlist'>글쓰기</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
