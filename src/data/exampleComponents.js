export const exampleComponents = [
  {
    name: "Button Component",
    code: `
// Define the component before exporting
const Component = () => {
  return (
    <button 
      style={{
        padding: '10px 20px',
        backgroundColor: '#4299E1',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      Click Me
    </button>
  );
}

// Export the component so it can be used
export default Component;
`
  }
];