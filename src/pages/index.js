import React from "react";
import { useFirebase } from "gatsby-plugin-firebase";

function IndexPage() {
  const [hello, setHello] = React.useState("world");

  useFirebase(firebase => {
    firebase
      .database()
      .ref("/hello")
      .once("value")
      .then(snapshot => {
        setHello(snapshot.val());
      });
  });

  return (
    <div>
      <p>Hello {hello}</p>
    </div>
  );
}

export default IndexPage;
