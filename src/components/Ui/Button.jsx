const Button = ({ children, className, onClick }) => {
  return (
    <button
      className={`self-center tracking-widest border text-white/95 cursor-pointer transition bg-amber-600 px-2 py-1 rounded-md hover:bg-amber-700 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { Button };

// here in the above , the {text} is which we want to display and the {className} is if want to add any extra-css then we need to pass as children when we defined

// if we declare as ({text , className}) then we are calling that button , we need to write it as <Button text = "add to cart"> </Button>

// But if we declare like ({children,className}) then we can easily pass the text in between itself <Button>Add to Cart</Button>
