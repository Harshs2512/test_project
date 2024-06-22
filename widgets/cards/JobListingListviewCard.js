import { Card, Image } from 'react-bootstrap';
import Link from 'next/link';

const JobListingListviewCard = props => {
  const { item } = props;

  const formatDate = (dateString) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const date = new Date(dateString);
    const year = date.getFullYear().toString();
    const month = months[date.getMonth()];
    const day = String(date.getDate()).padStart(2, "0");
    return ` ${day},${month},${year}`;
  };
  const currentDate = new Date();
  const createDate = new Date(item && item.createdAt);
  const timeDifference = currentDate - createDate;
  const daysDifference = Math.round(timeDifference / (1000 * 60 * 60 * 24));
  let displayText = '';
  const monthsDifference = Math.floor(daysDifference / 30);
  const remainingDays = daysDifference % 30;
  if (monthsDifference === 0) {
    if (daysDifference === 0) {
      displayText = 'Today';
    } else if (daysDifference === 1) {
      displayText = '1 day ago';
    } else {
      displayText = `${daysDifference} days ago`;
    }
  } else if (monthsDifference === 1) {
    if (remainingDays === 0) {
      displayText = '1 month ago';
    } else {
      displayText = `1 month ${remainingDays} days ago`;
    }
  } else {
    if (remainingDays === 0) {
      displayText = `${monthsDifference} months ago`;
    } else {
      displayText = `${monthsDifference} months ${remainingDays} days ago`;
    }
  }
  return (
    <Card className="card-bordered mb-4 card-hover cursor-pointer my-4">
      <Card.Body>
        <div>
          <div className="d-md-flex">
            <div className="mb-3 mb-md-0">
              <Image
                src={
                  item._id
                    ? `/api/siteSettings/landingPage/placementRecords/getStudenticon/${item._id}`
                    : ""
                }
                alt="profile image"
                className="avatar rounded-circle icon-shape"
              />
            </div>
            <div className="ms-md-3 w-100 mt-3 mt-xl-1">
              <div className="justify-content-between mb-5">
                <div>
                  <h3 className="mb-1 fs-4">
                    <Link href={`/marketing/jobs/${item.slug}`} className="text-inherit me-1">{item.student_name}</Link>
                    {item.featured === true ? <span className="badge bg-success-soft ms-2">Selected</span>
                      : <span className="badge bg-success-soft ms-2">Selected</span>}
                  </h3>
                  <div>
                    <div className='d-flex'>
                      <h4>at {item.company_name} </h4> | <h4>{item.position}</h4> | <h4> {formatDate(item.placed_date)}</h4>
                    </div>
                    <span className="ms-0">
                      <svg id="fi_13465528" enable-background="new 0 0 100 100" height='25' weidth='25' viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g><g><path d="m62.747 57.053v9.267c0 2.267-1.84 4.12-4.107 4.12h-25.853l-15.56 12.627 1.413-12.627h-4.533c-2.267 0-4.107-1.853-4.107-4.12v-31.893c0-2.267 1.84-4.107 4.107-4.107h23.147v22.627c0 2.267 1.84 4.107 4.107 4.107h21.386z" fill="#f37"></path></g><g><path d="m90 21.04v31.907c0 2.267-1.84 4.107-4.107 4.107h-4.533l1.4 12.627-15.533-12.628h-25.867c-2.267 0-4.107-1.84-4.107-4.107v-31.906c0-2.267 1.84-4.107 4.107-4.107h44.533c2.267 0 4.107 1.84 4.107 4.107z" fill="#84c9fe"></path></g></g></svg>
                      23 comments</span>
                  </div>
                </div>
              </div>
              <div className="d-md-flex justify-content-between ">
                <div className="mb-2 mb-md-0">
                  <span className="me-2"><i className="fe fe-briefcase text-muted"></i><span className="ms-1 ">{item.campus_type}</span></span>
                  <span className="me-2">
                  <svg clip-rule="evenodd" fill-rule="evenodd" height="20" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg" id="fi_4175518"><g transform="translate(0 -120)"><path d="m21.58 136.335c1.195.69 1.605 2.22.915 3.415s-2.22 1.605-3.415.915-1.605-2.22-.915-3.415 2.22-1.605 3.415-.915z"></path><path d="m11.12 124.972c.206.047.42-.042.533-.221.823-1.304 2.493-2.251 4.347-2.251s3.524.947 4.347 2.251c.113.179.327.268.533.221 1.504-.34 3.355.171 4.666 1.482s1.822 3.162 1.482 4.666c-.047.206.042.42.221.533 1.304.823 2.251 2.493 2.251 4.347s-.947 3.524-2.251 4.347c-.179.113-.268.327-.221.533.34 1.504-.171 3.355-1.482 4.666s-3.162 1.822-4.666 1.482c-.206-.047-.42.042-.533.221-.823 1.304-2.493 2.251-4.347 2.251s-3.524-.947-4.347-2.251c-.113-.179-.327-.268-.533-.221-1.504.34-3.355-.171-4.666-1.482s-1.822-3.162-1.482-4.666c.047-.206-.042-.42-.221-.533-1.304-.823-2.251-2.493-2.251-4.347s.947-3.524 2.251-4.347c.179-.113.268-.327.221-.533-.34-1.504.171-3.355 1.482-4.666s3.162-1.822 4.666-1.482zm10.96 10.497c-1.673-.966-3.815-.392-4.781 1.281s-.392 3.815 1.281 4.781 3.815.392 4.781-1.281.392-3.815-1.281-4.781zm-3.513-4.915-6 10.392c-.138.239-.056.545.183.683s.545.056.683-.183l6-10.392c.138-.239.056-.545-.183-.683s-.545-.056-.683.183zm-5.147-.085c-1.673-.966-3.815-.392-4.781 1.281s-.392 3.815 1.281 4.781 3.815.392 4.781-1.281.392-3.815-1.281-4.781z"></path><path d="m12.92 131.335c1.195.69 1.605 2.22.915 3.415s-2.22 1.605-3.415.915-1.605-2.22-.915-3.415 2.22-1.605 3.415-.915z"></path></g></svg>
                    <span className="ms-1 ">{item.percentage} </span>
                  </span>
                  <span className="me-2">
                  <svg id="fi_8354269" enable-background="new 0 0 64 64" height="15" viewBox="0 0 64 64" width="15" xmlns="http://www.w3.org/2000/svg"><g><g><g><g><g><g><path d="m63.58 47.54h-53.91c-5.03 0-9.12-4.09-9.12-9.12s4.09-9.12 9.12-9.12h53.91c.5 0 .91.37.96.87.05.49-.27.95-.76 1.05-4.38.95-5.76 4.77-5.6 7.75.15 3.02 1.92 6.24 5.51 6.64.51.06.89.5.86 1.02-.03.51-.45.91-.97.91zm-53.91-16.31c-3.96 0-7.18 3.22-7.18 7.18s3.22 7.18 7.18 7.18h49.51c-1.71-1.54-2.8-3.85-2.94-6.54-.14-2.79.83-5.84 3.16-7.83h-49.73z"></path></g></g><g><path d="m57.2 39.39h-49.02c-.54 0-.97-.43-.97-.97s.43-.97.97-.97h49.02c.54 0 .97.43.97.97 0 .53-.43.97-.97.97z"></path></g></g><g><g><g><path d="m63.58 63.84h-53.91c-5.03 0-9.12-4.09-9.12-9.12s4.09-9.12 9.12-9.12c.54 0 .97.43.97.97s-.43.97-.97.97c-3.96 0-7.18 3.22-7.18 7.18s3.22 7.18 7.18 7.18h49.51c-1.71-1.54-2.8-3.85-2.94-6.54-.21-4.03 1.92-8.61 7.13-9.74.52-.12 1.04.22 1.15.74s-.22 1.04-.74 1.15c-4.38.95-5.76 4.77-5.6 7.75.15 3.02 1.92 6.24 5.51 6.64.51.06.89.5.86 1.02s-.45.92-.97.92z"></path></g></g><g><path d="m57.2 55.69h-49.02c-.54 0-.97-.43-.97-.97s.43-.97.97-.97h49.02c.54 0 .97.43.97.97s-.43.97-.97.97z"></path></g></g></g><g><g><path d="m31.01 18.12c-.09 0-.18-.01-.27-.04l-26.64-7.7c-.41-.12-.7-.49-.7-.92s.27-.81.68-.94l26.64-8.32c.18-.06.37-.06.55-.01l28.31 8.01c.42.12.71.5.71.93s-.29.81-.71.93l-28.31 8.01c-.08.04-.17.05-.26.05zm-23.28-8.7 23.28 6.73 24.74-7-24.73-7z"></path></g><g><path d="m13.94 31.23c-.54 0-.97-.43-.97-.97v-18.04c0-.54.43-.97.97-.97s.97.43.97.97v18.05c0 .53-.43.96-.97.96z"></path></g><g><path d="m48.7 31.23c-.54 0-.97-.43-.97-.97v-18.04c0-.54.43-.97.97-.97s.97.43.97.97v18.05c0 .53-.43.96-.97.96z"></path></g><g><g><path d="m57.89 20.47c-.54 0-.97-.43-.97-.97v-9.96c0-.54.43-.97.97-.97s.97.43.97.97v9.95c0 .54-.43.98-.97.98z"></path></g></g></g></g><g><path d="m59.99 24.67h-4.2c-.54 0-.97-.43-.97-.97v-4.2c0-.54.43-.97.97-.97h4.2c.54 0 .97.43.97.97v4.2c0 .53-.43.97-.97.97zm-3.23-1.94h2.26v-2.26h-2.26z"></path></g></g></svg>
                  <span className="ms-1 ">{item.collage_name}</span></span>
                </div>
              </div>
              <div className="d-md-flex justify-content-between p-2">
                <div className="mb-2 mb-md-0">
                  <span className="me-2"><span className="ms-1 ">{item.selected_round} Round</span></span>
                  <span className="me-2"><span className="ms-1 ">{item.coding_number} coading problems</span></span>
                </div>
                <div className='p-2'>
                  <i className="fe fe-clock text-muted"></i> <span>  {displayText}</span>
                </div>
              </div>
            </div>
            </div>
        </div>
      </Card.Body>
    </Card>
  )
}
export default JobListingListviewCard