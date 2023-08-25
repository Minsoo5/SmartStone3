package min.zipcode.smartstone3.repository;

import min.zipcode.smartstone3.domain.Stone;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Stone entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StoneRepository extends JpaRepository<Stone, Long> {}
