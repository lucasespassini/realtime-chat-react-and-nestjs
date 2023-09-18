import { AppRoutes } from "./routes/routes";
import { AppProviders } from "./contexts";

export const App = () => {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
};
