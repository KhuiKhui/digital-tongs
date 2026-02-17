import Button from './Button';
import LinkButton from './LinkButton';
import Figures from './Figures';
import { deleteSession, getCurrentSession } from '@/lib/session';
import ChooseButton from './ChooseButton';

async function Header() {
  const user = await getCurrentSession();
  return (
    <div className="flex w-full flex-row items-center justify-between p-4">
      <Figures />
      <div className="flex flex-row gap-2">
        <ChooseButton />
        <LinkButton label="Gacha" href="/gacha" />
        <LinkButton label="Home" href="/" />
        {user ? (
          <Button onClick={deleteSession} label="Logout" />
        ) : (
          <div className="flex flex-row items-center justify-center gap-2">
            <LinkButton label="Login" href="/login" />
            <LinkButton label="Signup" href="/signup" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
