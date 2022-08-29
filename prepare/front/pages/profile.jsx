import React, { useEffect } from "react";
import Router from "next/router";

import Head from "next/head";
import AppLayout from "../components/AppLayout";
import { useSelector } from "react-redux";

function profile() {
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push("/");
    }
  }, [me && me.id]);

  if (!me) {
    return null;
  }

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>내 프로필</AppLayout>
    </>
  );
}

export default profile;
