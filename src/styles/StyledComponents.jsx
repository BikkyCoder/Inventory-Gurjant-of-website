import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background-color: ${(props) => (props.theme === 'dark' ? '#1a202c' : '#f7fafc')};
  transition: background-color 0.3s ease;
`;

export const Nav = styled.nav`
  background-color: #1a202c;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 50;
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  a {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
    
    &:hover {
      color: #a0aec0;
      background-color: rgba(255,255,255,0.1);
    }
  }
`;