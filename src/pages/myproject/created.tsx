import SecondaryProjectLayout from '@/components/Projects/SecondaryProjectLayout';
import { useEffect, useState } from 'react';
import PrimaryLayout from 'src/components/Layouts/PrimaryLayout';
import { useAppSelector } from 'src/redux/hooks';
import { ProjectService } from 'src/services/ProjectService';

// TODO: 무한스크롤
const MyCreatedProject = () => {
  const token = useAppSelector((state) => state.auth.token);

  const [createdProject, setCreatedProject] = useState([]);

  useEffect(() => {
    token &&
      (async () => {
        setCreatedProject((await ProjectService.createdProject()).content);
      })();
  }, [token]);

  return (
    <PrimaryLayout>
      {token && (
        <SecondaryProjectLayout
          title="내가 만든 프로젝트"
          projectDtoList={createdProject}
        />
      )}
    </PrimaryLayout>
  );
};

export default MyCreatedProject;
