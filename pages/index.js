const Homepage = (props) => {

  return null;
}


export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: "/launchverse/",
      permanent: false
    }
  }
}

export default Homepage;
