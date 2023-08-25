package min.zipcode.smartstone3.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import min.zipcode.smartstone3.domain.Stone;
import min.zipcode.smartstone3.repository.StoneRepository;
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
 * REST controller for managing {@link min.zipcode.smartstone3.domain.Stone}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class StoneResource {

    private final Logger log = LoggerFactory.getLogger(StoneResource.class);

    private static final String ENTITY_NAME = "stone";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StoneRepository stoneRepository;

    public StoneResource(StoneRepository stoneRepository) {
        this.stoneRepository = stoneRepository;
    }

    /**
     * {@code POST  /stones} : Create a new stone.
     *
     * @param stone the stone to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new stone, or with status {@code 400 (Bad Request)} if the stone has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/stones")
    public ResponseEntity<Stone> createStone(@RequestBody Stone stone) throws URISyntaxException {
        log.debug("REST request to save Stone : {}", stone);
        if (stone.getId() != null) {
            throw new BadRequestAlertException("A new stone cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Stone result = stoneRepository.save(stone);
        return ResponseEntity
            .created(new URI("/api/stones/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /stones/:id} : Updates an existing stone.
     *
     * @param id the id of the stone to save.
     * @param stone the stone to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated stone,
     * or with status {@code 400 (Bad Request)} if the stone is not valid,
     * or with status {@code 500 (Internal Server Error)} if the stone couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/stones/{id}")
    public ResponseEntity<Stone> updateStone(@PathVariable(value = "id", required = false) final Long id, @RequestBody Stone stone)
        throws URISyntaxException {
        log.debug("REST request to update Stone : {}, {}", id, stone);
        if (stone.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, stone.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!stoneRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Stone result = stoneRepository.save(stone);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, stone.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /stones/:id} : Partial updates given fields of an existing stone, field will ignore if it is null
     *
     * @param id the id of the stone to save.
     * @param stone the stone to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated stone,
     * or with status {@code 400 (Bad Request)} if the stone is not valid,
     * or with status {@code 404 (Not Found)} if the stone is not found,
     * or with status {@code 500 (Internal Server Error)} if the stone couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/stones/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Stone> partialUpdateStone(@PathVariable(value = "id", required = false) final Long id, @RequestBody Stone stone)
        throws URISyntaxException {
        log.debug("REST request to partial update Stone partially : {}, {}", id, stone);
        if (stone.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, stone.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!stoneRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Stone> result = stoneRepository
            .findById(stone.getId())
            .map(existingStone -> {
                if (stone.getGritLeve() != null) {
                    existingStone.setGritLeve(stone.getGritLeve());
                }
                if (stone.getSharpnessLimit() != null) {
                    existingStone.setSharpnessLimit(stone.getSharpnessLimit());
                }

                return existingStone;
            })
            .map(stoneRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, stone.getId().toString())
        );
    }

    /**
     * {@code GET  /stones} : get all the stones.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of stones in body.
     */
    @GetMapping("/stones")
    public List<Stone> getAllStones() {
        log.debug("REST request to get all Stones");
        return stoneRepository.findAll();
    }

    /**
     * {@code GET  /stones/:id} : get the "id" stone.
     *
     * @param id the id of the stone to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the stone, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/stones/{id}")
    public ResponseEntity<Stone> getStone(@PathVariable Long id) {
        log.debug("REST request to get Stone : {}", id);
        Optional<Stone> stone = stoneRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(stone);
    }

    /**
     * {@code DELETE  /stones/:id} : delete the "id" stone.
     *
     * @param id the id of the stone to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/stones/{id}")
    public ResponseEntity<Void> deleteStone(@PathVariable Long id) {
        log.debug("REST request to delete Stone : {}", id);
        stoneRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
