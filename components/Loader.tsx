import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';

export function Loader() {
  return (
    <div className="flex items-center justify-center w-full h-full flex-grow gap-2">
      <CachedOutlinedIcon className="animate-spin w-5 h-5" data-testid="spinner" />
    </div>
  );
}

export default Loader;
