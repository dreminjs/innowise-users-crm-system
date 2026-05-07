import { NavigationItem } from "@/components/NavigationItem";

export const UsersNavigation = () => {
  return (
    <nav>
      <ul>
        <NavigationItem isActive={false} to={""}>
          Профиль
        </NavigationItem>
        <NavigationItem isActive={false} to={"skills"}>
          Скиллы
        </NavigationItem>
        <NavigationItem isActive={false} to={"languages"}>
          Языки
        </NavigationItem>
      </ul>
    </nav>
  );
};
