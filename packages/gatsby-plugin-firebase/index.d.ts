declare module "gatsby-plugin-firebase" {
  export function useFirebase(
    callback: (
      firebase: typeof import("firebase"),
    ) => void | (() => void),
    deps: any[],
  ): void;

  export var FirebaseContext: import("react").Context<
    typeof import("firebase") | undefined
  >;
}
