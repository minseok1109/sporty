import Link from "next/link";
import styles from './Navbar.module.css'
function Navbar() {
    return (<>
        <header className={`${styles.head}`}>
            <Link href='/'>
                <img className={`${styles.img_hover}`} src="/icon.png" alt="icon" />
            </Link>
            <nav className={`${styles.left}`}>
                <Link href="/">
                    <a className={`${styles.nav_a}`}>홈</a>
                </Link>
                <Link href="/article">
                    <a className={`${styles.nav_a}`}>게시글</a>
                </Link>
                <Link href="/getPeople">
                    <a className={`${styles.nav_a}`}>모집하기</a>
                </Link>
            </nav>
            <input placeholder="종목을 입력하세요" />
            <nav>
                <Link href="/account/login">
                    <a className={`${styles.nav_a}`}>로그인</a>
                </Link>
                <Link href="/account/signUp">
                    <a className={`${styles.nav_a}`}>회원가입</a>
                </Link>
            </nav>
        </header>

    </>
    );

}

export default Navbar;
