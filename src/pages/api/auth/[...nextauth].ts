// import NextAuth, { NextAuthOptions, User, Session } from "next-auth"
// import Credentials from "next-auth/providers/credentials"
// import { signInSchema } from "@/lib/zod"
// import { ZodError } from "zod"
// import { JWT } from "next-auth/jwt"
// import { api } from "@/utils/api/api"
// import { API_URL } from "@/utils/constants/api"

// // NextAuthの設定オプションを定義
// export const authOptions: NextAuthOptions = {
//   // 認証プロバイダーの設定
//   providers: [
//     // カスタム認証 (メールとパスワードを利用)
//     Credentials({
//       credentials: {
//         email: {},// ユーザーのメールアドレス入力用
//         password: {}, // ユーザーのメールアドレス入力用
//       },
//       // `authorize`メソッドでユーザーの認証情報を処理
//       authorize: async (credentials) => {
//         try {
//           // Zodスキーマで入力データを検証
//           const { email , password } = await signInSchema.parseAsync(credentials)
//           // APIを呼び出してユーザー認証を実行
//           const response = await api.postWithoutAuth({
//             endPoint: API_URL.AUTH_USER_LOGIN,
//             sendData: {
//               email: email,
//               password: password,
//             }
//           });
//           if (response.status !== 200) {
//             const message = await response.data;
//             throw new Error(JSON.stringify({
//               status: response.status,
//               message: message.message,
//             }));
//           }
//           const data = await response.data;
//            // APIレスポンスからトークンと有効期限を取得
//           const access_token = data.access_token;
//           const refresh_token = data.refresh_token;
//           const expires_in = data.expires_in;
//           const profile = data.user;
//           const user = {id: profile.user_identify, access_token, refresh_token, expires_in, profile };
//           // ユーザー情報とaccess_tokenがない場合、認証は失敗
//         if (!user || !access_token || !refresh_token || !expires_in || !profile) {
//             return null;
//         }
//           // ユーザー情報を返し、JWTとセッションで使用可能にする
//           return user
//         } catch (error) {
//           if (error instanceof ZodError) {
//             return null
//           }
//           throw error;
//         }
//       },
//     }),
//   ],
//   // JWTとセッションのカスタム動作を定義
//   callbacks: {
//     // JWTコールバック: トークンが生成または更新されるたびに呼ばれる
//     async jwt({ token, user, trigger, session }: { token: JWT; user: User, trigger?: string, session?: Session  }) {
//       if (user) {
//         // ログイン時にトークンをユーザー情報で更新
//         token.access_token = user.access_token;
//         token.refresh_token = user.refresh_token;
//         token.expires_in = user.expires_in;
//         token.id = user.id;
//         token.email = user.profile?.email;
//         token.name = user.profile?.user_name;
//         token.user = user;
//       } else if (trigger === "update" && session) {
//         // セッション更新トリガーを処理する
//         if (session.user) {
//           token.email = session.user.email;
//           token.name = session.user.name;
//           token.user.profile.email = session.user.email;
//           token.user.profile.user_name = session.user.name;
//         }
//       } else if (Date.now() / 1000 > token.expires_in) {
//         const res = await api.postWithoutAuth({
//           endPoint: API_URL.AUTH_USER_REFRESH_TOKEN,
//           sendData: {
//             refresh_token: token.refresh_token,
//           },
//         });
//         const refreshedToken = await res.data;
//         if (res.status !== 200 || !refreshedToken.access_token) {
//           throw new Error("トークンを更新できません。 ");
//         }
//         // 更新されたトークン情報でトークンを更新
//         token.access_token = refreshedToken.access_token;
//         token.refresh_token = refreshedToken.refresh_token;
//         token.expires_in = refreshedToken.expires_in;
//         token.user.profile.user_name = refreshedToken.user.user_name;
//         token.user.profile.email = refreshedToken.user.email;
//       }
//       // 更新されたトークンを返す
//       return token;
//     },
//     // セッションコールバック: セッションが生成またはアクセスされるたびに呼ばれる
//     async session({ session, token }: { session: Session; token: JWT }) {
//        // セッションオブジェクトにトークンデータを追加
//       session.access_token = token.access_token;
//       session.refresh_token = session.refresh_token;
//       if (session.user) {
//         session.user.id = token.user.id;
//         session.user.email = token.user.profile.email;
//         session.user.name = token.user.profile.user_name;
//       }
//       // 更新されたセッションを返す
//       return session;
//     },
//   },
//    // サインインとエラー処理のカスタムページを指定
//   pages: {
//     signIn: "/login", // カスタムログインページ
//     error: "/error", // カスタムエラーページ
//   },
//    // JWTの署名に使用する秘密鍵
//   secret: process.env.NEXTAUTH_SECRET,
//    // セッションストラテジーの設定
//   session: {
//     strategy: "jwt", // JWTをセッションストレージとして利用
//   }
// }

// export default NextAuth(authOptions)
