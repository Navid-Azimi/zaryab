import Image from 'next/image';
import Link from 'next/link';
import Link2 from '../Link2/Link2';
import NewsLetterForm from '../NewsLetterForm/NewsLetterForm';

export default async function Footer() {
  // categories
  const categoriesRes = await fetch(
    'https://zariab.cyborgtech.co/wp-json/v1/categories',
    {
      next: { revalidate: 14400 },
    }
  );

  let categoriesData = await categoriesRes.json();
  const nextMultipleOfSix = Math.ceil(categoriesData.length / 6) * 6;
  while (categoriesData.length < nextMultipleOfSix) {
    categoriesData.push({ name: '', slug: '#' });
  }

  // writings

  const storiesRes = await fetch(
    'https://zariab.cyborgtech.co/wp-json/v1/story_type',
    {
      next: { revalidate: 14400 },
    }
  );
  const poemsRes = await fetch(
    'https://zariab.cyborgtech.co/wp-json/v1/poem_type',
    { next: { revalidate: 14400 } }
  );

  const storiesData = await storiesRes.json();
  const poemsData = await poemsRes.json();

  const totalLength =
    Math.ceil((storiesData.length + poemsData.length) / 6) * 6;
  let result = new Array(totalLength).fill(null);

  let storyIndex = 0;
  let poemIndex = 0;

  for (let i = 0; i < totalLength; i++) {
    if ((i % 6 === 0 || i % 6 === 1) && storyIndex < storiesData.length) {
      result[i] = storiesData[storyIndex++];
    } else if (poemIndex < poemsData.length) {
      result[i] = poemsData[poemIndex++];
    }
  }

  // articles

  const articleRes = await fetch(
    'https://zariab.cyborgtech.co/wp-json/v1/article_type',
    {
      next: { revalidate: 14400 },
    }
  );

  let articleData = await articleRes.json();
  const nextMultipleOfSixArticle = Math.ceil(articleData.length / 6) * 6;
  while (articleData.length < nextMultipleOfSixArticle) {
    articleData.push({ name: '', slug: '#' });
  }

  // reviews

  const reviewRes = await fetch(
    'https://zariab.cyborgtech.co/wp-json/v1/review_type',
    {
      next: { revalidate: 14400 },
    }
  );

  let reviewData = await reviewRes.json();
  const nextMultipleOfSixReview = Math.ceil(reviewData.length / 5) * 5;
  while (reviewData.length < nextMultipleOfSixReview) {
    reviewData.push({ name: '', slug: '#' });
  }

  // podcasts

  const podcastRes = await fetch(
    'https://zariab.cyborgtech.co/wp-json/v1/podcast_type',
    {
      next: { revalidate: 14400 },
    }
  );
  let podcastData = await podcastRes.json();
  const nextMultipleOfSixPodcast = Math.ceil(podcastData.length / 6) * 6;

  while (podcastData.length < nextMultipleOfSixPodcast) {
    podcastData.push({ name: '', slug: '#' });
  }

  // letters
  const letterRes = await fetch(
    'https://zariab.cyborgtech.co/wp-json/v1/letter_type',
    {
      next: { revalidate: 14400 },
    }
  );

  let letterData = await letterRes.json();
  const nextMultipleOfSixLetter = Math.ceil(letterData.length / 6) * 6;
  while (letterData.length < nextMultipleOfSixLetter) {
    letterData.push({ name: '', slug: '#' });
  }

  // new magazine

  const newMagazineRes = await fetch(
    'https://zariab.cyborgtech.co/wp-json/v1/letters/?type=non-archive&per_page=1',
    {
      next: { revalidate: 14400 },
    }
  );

  const newMagazineData = await newMagazineRes.json();

  return (
    <footer className="bg-footer">
      {/*main div of footer*/}
      <div className="bg-footerPic bg-no-repeat bg-bottom bg-auto flex flex-col items-center rtl py-50px">
        {/* text logo and others things */}
        <div className="main-container">
          <div className="col-span-6 xl:col-span-3 grid grid-cols-6 xl:grid-cols-3 gap">
            <div className="col-span-6 md:col-span-2 xl:col-span-3 xl:mt-100px">
              <div className="w-full h-[180px] relative md:hidden xl:block">
                <Image
                  src="/assets/svg/footerLogo.svg"
                  alt=""
                  layout="fill"
                  objectFit="contain"
                  className="absolute"
                />
              </div>
              <div className="hidden md:block xl:hidden w-full h-[300px] relative">
                <Image
                  src="/assets/svg/tablet-logo.svg"
                  alt=""
                  layout="fill"
                  objectFit="contain"
                  className="absolute"
                />
              </div>
            </div>
            <div className="hidden md:block md:col-span-1 xl:hidden"></div>
            {newMagazineData?.data && (
              <div className="col-span-6 md:col-span-3 xl:col-span-3">
                <div className="relative w-full h-490px md:h-510px xl:h-390px 2xl:h-510px mt-20px xl:mt-0">
                  {newMagazineData?.data[0]?.featured_image ? (
                    <Image
                      src={newMagazineData?.data[0]?.featured_image}
                      alt="new magazine"
                      layout="fill"
                      objectFit="cover"
                      className="absolute"
                    />
                  ) : (
                    <div className="w-full h-full flex justify-center items-center"></div>
                  )}
                </div>
                <Link
                  href={`/magazines/${newMagazineData?.data[0]?.slug}`}
                  className="w-full h-10 mt-3 flex justify-center items-center font-common-heavy text-white
                   bg-footerBtn hover:bg-footer transition-all border-2 border-footerBtn text-27px md:text-28px
                   "
                >
                  خواندن مجله
                </Link>
              </div>
            )}
          </div>
          <div className="hidden xl:block xl:col-span-1"></div>
          <div className="col-span-6 xl:col-span-8 rtl text-white mt-50px xl:mt-100px">
            <div className="w-full font-common-heavy text-20px md:text-36px">
              قوانین ارسال آثار ادبی در آوای زریاب
            </div>
            <ul className="w-full rtl font-common-thin text-10 md:text-17 mt-7">
              <li>
                ۱. اثر فرستاده شده نباید در مغایر با ارزش‌های افغانستان باشد.
              </li>
              <li>
                ۲. اثر باید از نظر زبانی و دستوری روان و بدون غلط‌های املایی
                باشد.
              </li>
              <li>۳. اثر باید دارای ساختار مشخص باشد.</li>
              <li>۴. صاحب اثر باید قالب اثر را در ابتدای اثر مشخص کند.</li>
              <li>۵. اثر باید، باید به‌صورت یکپارچه و منظم ارسال شود.</li>
              <li>
                ۶. آثار ادبی به تمامی زبان‌های رایج در افغانستان (دری، پشتو،
                ازبیکی و ...) پذیرفته می‌شود.
              </li>
              <li>
                ۷. نویسنده / شاعر باید مالک اثر باشد و ارسال اثر به معنی تأیید
                این موضوع است.
              </li>
              <li>
                ۸. تیم آوای زریاب می‌تواند آثار را برای اصلاحات نگارشی و زبانی
                ویرایش کند.
              </li>
              <li>
                ۹. پس از انتشار، آثار در آرشیو سایت باقی می‌ماند و حذف آن فقط با
                دلایل معقول امکان‌پذیر است.
              </li>
              <li>۱۰. آثار باید در قالب فایل متنی (Word ) ارسال شوند.</li>
              <li>
                ۱۱. صاحب اثر باید نام کامل، سن، محل زندگی، عکس ، آدرس ایمیل و در
                صورت تمایل یک بیوگرافی کوتاه از خود ارائه دهد.
              </li>
              <li></li>
            </ul>
            <div className="w-full font-common-heavy text-20px md:text-36px rtl mt-50px">
              قوانین ارسال مقاله و نقد و نظر در آوای زریاب
            </div>
            <ul className="w-full rtl font-common-thin text-10 md:text-17 mt-7">
              <li className="rtl">
                ۱. مقاله‌ها باید در حوزه ادبیات باشند (نقد ادبی، معرفی کتاب و
                نویسندگان و موضوعات مرتبط).
              </li>
              <li className="rtl">
                ۲. محتوای مقاله نباید مغایر با ارزش‌های افغانستان باشد.
              </li>
              <li className="rtl">
                ۳. مقالات باید به‌صورت روان و بدون غلط‌های املایی و نگارشی
                باشند.
              </li>
              <li className="rtl">
                ۴. مقاله باید حداقل 500 و حداکثر 2000 کلمه باشد. ( آوای زریاب از
                نشر مقاله‌های طولانی خودداری می‌کند).
              </li>
              <li className="rtl">
                ۵. مقاله به تمامی زبان‌های رایج در افغانستان (فارسی، پشتو،
                ازبیکی و ...) پذیرفته می‌شود.
              </li>
              <li className="rtl">
                ۶. نویسنده با ارسال مقاله تأیید می‌کند که مالک اثر بوده یا اجازه
                انتشار آن را دارد.
              </li>
              <li className="rtl">
                ۷. پس از تأیید و انتشار، مقاله در آرشیو آوای زریاب باقی می‌ماند
                و حذف آن تنها با ارائه دلایل معقول امکان‌پذیر است.
              </li>
              <li className="rtl">
                ۸. تیم تحریریه آوای زریاب حق ویرایش جزئی مقاله‌ها (برای اصلاح
                نگارشی و بهبود خوانایی) را دارد.
              </li>
              <li className="rtl">
                ۹. در صورت نیاز به تغییرات اساسی، مقاله برای اصلاح به نویسنده
                بازگردانده می‌شود.
              </li>
              <li className="rtl">
                ۱۰. مقاله‌ها باید در قالب فایل متنی (Word ) ارسال شوند.
              </li>
              <li className="rtl">
                ۱۱. نویسنده باید نام کامل، سن، محل زندگی، عکس ، آدرس ایمیل و در
                صورت تمایل یک بیوگرافی کوتاه از خود ارائه دهد.
              </li>
            </ul>
            <div className="w-full font-common-heavy text-20px md:text-36px mt-30px">
              برای فرستادن آثار خویش ایمیل کنید:
            </div>
            <ul className="w-full rtl font-common-thin text-10 md:text-17 mt-7">
              <li>zaryabshortstory@gmail.com</li>
            </ul>
            <div className="font-common-heavy text-26px md:text-36px mt-50px">
              عضویت در خبرنامه مان
            </div>
            <NewsLetterForm />
            <div className="w-full">
              <p className="mt-3 rtl font-common-thin text-12 md:text-17">
                با وارد کردن ایمیل تان در این جا شما به دریافت ایمیل خبری در
                مورد آوای زریاب و موضوعات دیگر رضایت میدهید.
              </p>
            </div>
          </div>
        </div>
        {/* links */}
        <div className="main-container mt-100px border-t-4 border-b-4 border-footerBorder py-10px rtl">
          <div className="col-span-1 xl:col-span-2">
            <Link2
              link="/"
              title="خانه"
              head={true}
            />
          </div>
          <div className="col-span-1 xl:col-span-2"></div>
          <div className="col-span-1 xl:col-span-2"></div>
          <div className="col-span-1 xl:col-span-2"></div>
          <div className="col-span-1 xl:col-span-2"></div>
          <div className="col-span-1 xl:col-span-2"></div>
        </div>
        <div className="main-container mt-10px border-t-4 border-b-4 border-footerBorder py-10px">
          <div className="col-span-1 xl:col-span-2">
            <Link2
              link="/writing"
              title="آثار ادبی"
              head={true}
            />
          </div>
          <div className="col-span-1 xl:col-span-2"></div>
          <div className="col-span-1 xl:col-span-2"></div>
          <div className="col-span-1 xl:col-span-2"></div>
          <div className="col-span-1 xl:col-span-2"></div>
          <div className="col-span-1 xl:col-span-2"></div>

          <div className="col-span-1 xl:col-span-2">
            <Link2
              link="/writing"
              title="داستان"
            />
          </div>
          <div className="col-span-1 xl:col-span-2"></div>
          <div className="col-span-1 xl:col-span-2">
            <Link2
              link="/writing"
              title="شعر"
            />
          </div>
          <div className="col-span-1 xl:col-span-2"></div>
          <div className="col-span-1 xl:col-span-2"></div>
          <div className="col-span-1 xl:col-span-2"></div>

          {Array.isArray(result) &&
            result?.map((data, index) => (
              <div
                className="col-span-1 xl:col-span-2"
                key={index}
              >
                <Link2
                  link={`/writing/?type=${data?.slug}`}
                  title={data?.name}
                />
              </div>
            ))}
        </div>

        <div className="main-container mt-10px border-t-4 border-b-4 border-footerBorder py-10px">
          <div className="col-span-1 xl:col-span-2">
            <Link2
              link="/articles"
              title="مقاله‌ها"
              head={true}
            />
          </div>
          <div className="col-span-1 xl:col-span-2"></div>
          <div className="col-span-1 xl:col-span-2"></div>
          <div className="col-span-1 xl:col-span-2"></div>
          <div className="col-span-1 xl:col-span-2"></div>
          <div className="col-span-1 xl:col-span-2"></div>

          {Array.isArray(articleData) &&
            articleData?.map((data, index) => (
              <div
                className="col-span-1 xl:col-span-2"
                key={index}
              >
                <Link2
                  link={`/articles/?article_type=${data?.slug}`}
                  title={data?.name}
                />
              </div>
            ))}
        </div>
        <div className="main-container mt-10px border-t-4 border-b-4 border-footerBorder py-10px">
          <div className="col-span-1 xl:col-span-2">
            <Link2
              link="/review"
              title="نقد و نظر‌ها"
              head={true}
            />
          </div>
          <div className="col-span-1 xl:col-span-2"></div>
          <div className="col-span-1 xl:col-span-2"></div>
          <div className="col-span-1 xl:col-span-2"></div>
          <div className="col-span-1 xl:col-span-2"></div>
          <div className="col-span-1 xl:col-span-2"></div>

          {Array.isArray(reviewData) &&
            reviewData?.map((data, index) => (
              <div
                key={index}
                className={`col-span-1 xl:col-span-2 ${
                  index + 1 === 3 ? ' col-span-2 xl:col-span-4' : ''
                }`}
              >
                <Link2
                  link={`/review/?review_type=${data?.slug}`}
                  title={data?.name}
                />
              </div>
            ))}
        </div>
        <div className="main-container mt-10px border-t-4 border-b-4 border-footerBorder py-10px">
          <div className={`col-span-1 xl:col-span-2`}>
            <Link2
              link="/podcasts"
              title="کتاب صوتی"
              head={true}
            />
          </div>
          <div className="col-span-1 xl:col-span-2"></div>
          <div className="col-span-1 xl:col-span-2"></div>
          <div className="col-span-1 xl:col-span-2"></div>
          <div className="col-span-1 xl:col-span-2"></div>
          <div className="col-span-1 xl:col-span-2"></div>

          {Array.isArray(podcastData) &&
            podcastData?.map((data, index) => (
              <div
                className="col-span-1 xl:col-span-2"
                key={index}
              >
                <Link2
                  link={`/podcasts/?podcast_type=${data?.slug}`}
                  title={data?.name}
                />
              </div>
            ))}
        </div>
        <div className="main-container mt-10px border-t-4 border-b-4 border-footerBorder py-10px">
          <div className="col-span-1 xl:col-span-2">
            <Link2
              link="/magazines"
              title="مجله ها"
              head={true}
            />
          </div>
          <div className="col-span-1 xl:col-span-2"></div>
          <div className="col-span-1 xl:col-span-2"></div>
          <div className="col-span-1 xl:col-span-2"></div>
          <div className="col-span-1 xl:col-span-2"></div>
          <div className="col-span-1 xl:col-span-2"></div>

          {Array.isArray(letterData) &&
            letterData?.map((data, index) => (
              <div
                className="col-span-1 xl:col-span-2"
                key={index}
              >
                <Link2
                  link={`/magazines/?magazine_type=${data?.slug}`}
                  title={data?.name}
                />
              </div>
            ))}
        </div>
        <div className="main-container mt-10px border-t-4 border-b-4 border-footerBorder py-10px">
          <div className="col-span-1 xl:col-span-2">
            <Link2
              link="#"
              title="کتگوری ها"
              head={true}
            />
          </div>
          <div className="col-span-1 xl:col-span-2"></div>
          <div className="col-span-1 xl:col-span-2"></div>
          <div className="col-span-1 xl:col-span-2"></div>
          <div className="col-span-1 xl:col-span-2"></div>
          <div className="col-span-1 xl:col-span-2"></div>

          {Array.isArray(categoriesData) &&
            categoriesData?.map((data, index) => (
              <div
                className="col-span-1 xl:col-span-2"
                key={index}
              >
                {data?.name && (
                  <Link2
                    link={`/search/?category=${data.slug}`}
                    title={data.name}
                  />
                )}
              </div>
            ))}
        </div>
      </div>
      {/* copyrighting policy */}
      <div className="bg-footerBorder flex flex-col items-center">
        <div className="main-container py-2 md:py-4 xl:py-7">
          <div className="col-span-3 xl:col-span-6">
            <p className="font-common-heavy text-7px md:text-14px xl:text-25px ltr">
              Design and development of the website by{' '}
              <Link href="https://cyborgtech.co">Cyborg Tech</Link>
            </p>
          </div>
          <div className="col-span-3 xl:col-span-6">
            <p className="font-common-heavy text-7px md:text-14px xl:text-25px rtl">
              دیزاین و ساخت وبسایت توست{' '}
              <Link href="https://cyborgtech.co">سایبُرگ تِک</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
