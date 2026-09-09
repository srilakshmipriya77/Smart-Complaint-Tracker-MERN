function Categories() {
  const categories = [
    'Plumbing',
    'Electrical',
    'Sanitation',
    'Roads',
  ];

  return (
    <div>
      <h1>Categories</h1>

      {categories.map((category) => (
        <p key={category}>{category}</p>
      ))}
    </div>
  );
}

export default Categories;