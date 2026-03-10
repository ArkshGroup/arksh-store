import ForgetPasswordPageClient from "./forgot-password-client";

export default async function ForgetPasswordPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <ForgetPasswordPageClient token={token} />;
}
