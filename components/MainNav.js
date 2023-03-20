import { useState } from 'react';
import { Navbar, Nav, Form, NavDropdown, FormControl, Button, Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from "next/link";
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store.js';

export default function MainNav() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();
  const [searchField, setSearchField] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
 
  const nav = (e, route) =>{
    router.push(route);
  };
  const submitForm = (e) => {
    e.preventDefault();
    setIsExpanded(false)
    router.push(`/artwork?title=true&q=${searchField}`);
    setSearchHistory(current => [...current, `title=true&q=${searchField}`]);
  };

  return (
    <><Navbar className='fixed-top navbar-dark bg-dark' variant="light" expand="lg" expanded={isExpanded}>
        <Container>
            <Navbar.Brand>Krish Harshadkumar Patel</Navbar.Brand>
            <Navbar.Toggle aria-controls="main-nav"  onClick={(e)=>setIsExpanded(!isExpanded)}/>
            <Navbar.Collapse id="main-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/" onClick={(e) => {setIsExpanded(false)}} active={router.pathname === "/"}>Home</Nav.Link>
                    <Nav.Link href="/search" onClick={(e) => {setIsExpanded(false)}} active={router.pathname === "/search"}>Advanced Search</Nav.Link>
                </Nav>
                &nbsp;
                <Form className="d-flex" onSubmit={submitForm}>
                    <Form.Control type="search" className="me-2" placeholder="Search" aria-label="Search" value={searchField} onChange={(e) => setSearchField(e.target.value)}/>
                    <Button type="submit" variant="success" onClick={(e)=>{nav(e, `/artwork?title=true&q=${searchField}`)}} >Search</Button>
                </Form>
                &nbsp;
                <Nav>
                  <NavDropdown title="User Name" id="basic-nav-dropdown">
                    <Link href='/favourites' legacyBehavior passHref><NavDropdown.Item onClick={(e)=>setIsExpanded(false)} active={router.pathname === "/favourites"}>Favourites</NavDropdown.Item></Link>
                    <Link href='/history' legacyBehavior passHref><NavDropdown.Item onClick={(e)=>setIsExpanded(false)} active={router.pathname === "/history"}>Search History</NavDropdown.Item></Link>
                  </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    <br />
    <br /></>
  );
}