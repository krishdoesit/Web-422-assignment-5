import { useState } from 'react';
import { Navbar, Nav, Form, NavDropdown, Button, Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from "next/link";
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store.js';
import { addToHistory } from "../lib/userData";
import { removeToken, readToken } from "../lib/authenticate";

export default function MainNav() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();
  const [searchField, setSearchField] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    setIsExpanded(false)
    router.push(`/artwork?title=true&q=${searchField}`);
    setSearchHistory(await addToHistory(`title=true&q=${searchField}`));
  };

  let token = readToken();
  function logout() {
    setIsExpanded(false);
    removeToken();
    router.push("/login");
  }

  return (
    <><Navbar className='fixed-top navbar-dark bg-dark' variant="light" expand="lg" expanded={isExpanded}>
        <Container>
          <Navbar.Brand>Krish Harshadkumar Patel</Navbar.Brand>
          <Navbar.Toggle aria-controls="main-nav" onClick={(e)=>setIsExpanded(!isExpanded)}/>
          <Navbar.Collapse id="main-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior><Nav.Link onClick={(e) => setIsExpanded(false)} active={router.pathname === "/"}>Home</Nav.Link></Link>
              {token && (<Link href="/search" passHref legacyBehavior><Nav.Link onClick={(e) => setIsExpanded(false)} active={router.pathname === "/search"}>Advanced Search</Nav.Link></Link>)}
            </Nav>
            &nbsp;
            {token && (
              <Form className="d-flex" onSubmit={submitForm}>
                <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" onChange={(e) => {setSearchField(e.target.value);}}/>
                <Button type="submit" variant="success">Search</Button>
              </Form>)
            }
            &nbsp;
            {token ? (
              <Nav>
                <NavDropdown title={token.userName} id="basic-nav-dropdown" active={ router.pathname === "/favourites" || router.pathname === "/history" }>
                  <Link href="/favourites" passHref legacyBehavior><NavDropdown.Item onClick={(e) => {setIsExpanded(false);}} active={router.pathname === "/favourites"}>Favourites</NavDropdown.Item></Link>
                  <Link href="/history" passHref legacyBehavior><NavDropdown.Item onClick={(e) => {setIsExpanded(false);}} active={router.pathname === "/history"}>Search History</NavDropdown.Item></Link>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <Nav className="ms-auto">
                <Link href="/register" passHref legacyBehavior><Nav.Link onClick={(e) => setIsExpanded(false)} active={router.pathname === "/register"}>Register</Nav.Link></Link>
                <Link href="/login" passHref legacyBehavior><Nav.Link onClick={(e) => { setIsExpanded(false);}}active={router.pathname === "/login"}>Login</Nav.Link></Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    <br /><br /></>
  );
}