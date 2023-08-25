package min.zipcode.smartstone3.repository;

import java.util.List;
import java.util.Optional;
import min.zipcode.smartstone3.domain.Knife;
import org.springframework.data.domain.Page;

public interface KnifeRepositoryWithBagRelationships {
    Optional<Knife> fetchBagRelationships(Optional<Knife> knife);

    List<Knife> fetchBagRelationships(List<Knife> knives);

    Page<Knife> fetchBagRelationships(Page<Knife> knives);
}
