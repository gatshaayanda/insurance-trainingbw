export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#C9A43E] to-[#0F264B] text-white mt-12 shadow-inner">
     <div className="text-center text-xs text-gray-500 mb-4">
  🌱 Powered sustainably. Our site emits only <strong>0.06g CO₂</strong> per view.{' '}
  <a
    href="https://www.websitecarbon.com/website/adhubmvp-vercel-app/"
    target="_blank"
    rel="noopener noreferrer"
    className="underline hover:text-green-700"
  >
    Verified by Website Carbon
  </a>
</div>
      <div className="container px-4 py-6 text-center text-sm space-y-1">
        <p>&copy; {new Date().getFullYear()} AdminHub. All rights reserved.</p>
        <p className="opacity-90">
          Made with precision — from intake to launch, and monthly support after.
        </p>
      </div>
    </footer>
  );
}
