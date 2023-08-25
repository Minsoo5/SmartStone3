package min.zipcode.smartstone3.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import min.zipcode.smartstone3.domain.Knife;
import min.zipcode.smartstone3.repository.KnifeRepository;
import min.zipcode.smartstone3.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link min.zipcode.smartstone3.domain.Knife}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class KnifeResource {

    private final Logger log = LoggerFactory.getLogger(KnifeResource.class);

    private static final String ENTITY_NAME = "knife";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final KnifeRepository knifeRepository;

    public KnifeResource(KnifeRepository knifeRepository) {
        this.knifeRepository = knifeRepository;
    }

    /**
     * {@code POST  /knives} : Create a new knife.
     *
     * @param knife the knife to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new knife, or with status {@code 400 (Bad Request)} if the knife has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/knives")
    public ResponseEntity<Knife> createKnife(@RequestBody Knife knife) throws URISyntaxException {
        log.debug("REST request to save Knife : {}", knife);
        if (knife.getId() != null) {
            throw new BadRequestAlertException("A new knife cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Knife result = knifeRepository.save(knife);
        return ResponseEntity
            .created(new URI("/api/knives/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /knives/:id} : Updates an existing knife.
     *
     * @param id the id of the knife to save.
     * @param knife the knife to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated knife,
     * or with status {@code 400 (Bad Request)} if the knife is not valid,
     * or with status {@code 500 (Internal Server Error)} if the knife couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/knives/{id}")
    public ResponseEntity<Knife> updateKnife(@PathVariable(value = "id", required = false) final Long id, @RequestBody Knife knife)
        throws URISyntaxException {
        log.debug("REST request to update Knife : {}, {}", id, knife);
        if (knife.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, knife.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!knifeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Knife result = knifeRepository.save(knife);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, knife.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /knives/:id} : Partial updates given fields of an existing knife, field will ignore if it is null
     *
     * @param id the id of the knife to save.
     * @param knife the knife to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated knife,
     * or with status {@code 400 (Bad Request)} if the knife is not valid,
     * or with status {@code 404 (Not Found)} if the knife is not found,
     * or with status {@code 500 (Internal Server Error)} if the knife couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/knives/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Knife> partialUpdateKnife(@PathVariable(value = "id", required = false) final Long id, @RequestBody Knife knife)
        throws URISyntaxException {
        log.debug("REST request to partial update Knife partially : {}, {}", id, knife);
        if (knife.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, knife.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!knifeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Knife> result = knifeRepository
            .findById(knife.getId())
            .map(existingKnife -> {
                if (knife.getKnifeStyle() != null) {
                    existingKnife.setKnifeStyle(knife.getKnifeStyle());
                }
                if (knife.getKnifeSize() != null) {
                    existingKnife.setKnifeSize(knife.getKnifeSize());
                }
                if (knife.getMetalType() != null) {
                    existingKnife.setMetalType(knife.getMetalType());
                }
                if (knife.getBevelSides() != null) {
                    existingKnife.setBevelSides(knife.getBevelSides());
                }
                if (knife.getCurrentSharpnessLevel() != null) {
                    existingKnife.setCurrentSharpnessLevel(knife.getCurrentSharpnessLevel());
                }
                if (knife.getDesiredOutcome() != null) {
                    existingKnife.setDesiredOutcome(knife.getDesiredOutcome());
                }
                if (knife.getStartingStone() != null) {
                    existingKnife.setStartingStone(knife.getStartingStone());
                }
                if (knife.getMiddleStone() != null) {
                    existingKnife.setMiddleStone(knife.getMiddleStone());
                }
                if (knife.getFinishStone() != null) {
                    existingKnife.setFinishStone(knife.getFinishStone());
                }

                return existingKnife;
            })
            .map(knifeRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, knife.getId().toString())
        );
    }

    /**
     * {@code GET  /knives} : get all the knives.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of knives in body.
     */
    @GetMapping("/knives")
    public List<Knife> getAllKnives(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Knives");
        if (eagerload) {
            return knifeRepository.findAllWithEagerRelationships();
        } else {
            return knifeRepository.findAll();
        }
    }

    /**
     * {@code GET  /knives/:id} : get the "id" knife.
     *
     * @param id the id of the knife to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the knife, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/knives/{id}")
    public ResponseEntity<Knife> getKnife(@PathVariable Long id) {
        log.debug("REST request to get Knife : {}", id);
        Optional<Knife> knife = knifeRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(knife);
    }

    /**
     * {@code DELETE  /knives/:id} : delete the "id" knife.
     *
     * @param id the id of the knife to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/knives/{id}")
    public ResponseEntity<Void> deleteKnife(@PathVariable Long id) {
        log.debug("REST request to delete Knife : {}", id);
        knifeRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
