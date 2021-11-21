const Homepage = (props) => {

  return null;
}


export async function getStaticProps(context) {
  return {
    redirect: {
      destination: "/launchverse/",
      permanent: false
    }
  }
}

export default Homepage;
