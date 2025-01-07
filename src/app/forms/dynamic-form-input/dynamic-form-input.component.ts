import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { buildImageUrl } from 'src/_utilities/buildImageUrl';
import { InputBase } from 'src/_inputs/input-base';
import { ImageService } from 'src/_services/image.service';
import { UserService } from 'src/_services/user.service';
import { DivisionService } from 'src/_services/division.service';
import { ProjectService } from 'src/_services/project.service';
import { LookUpService } from 'src/_services/lookup.service';
import { LocationService } from 'src/_services/location.service';

@Component({
  selector: 'app-dynamic-form-input',
  templateUrl: './dynamic-form-input.component.html'
})
export class DynamicFormInputComponent implements OnInit {
  @Input() input!: InputBase<string>;
  @Input() form!: FormGroup;

  imagePreview: string | undefined;
  items!: any[] | null; // ng-select doesn't cooperate w/ input.options
  bind_label: string = 'name';

  constructor(
    private imageService: ImageService,
    private divisionService: DivisionService,
    private projectService: ProjectService,
    private userService: UserService,
    private lookUpService: LookUpService,
    private locationService: LocationService
  ) { }

  ngOnInit(): void {
    if (this.input.controlType === 'image') {
      // load initial preview.
      this.updatePreview(Number(this.input.value));
    }

    if (this.input.controlType === 'multi-select') {
      this.form.get(`${this.input.key}`)?.patchValue(this.input.idArray); //make sure the form value is updated for validation.
    }

    switch (this.input.selectType) {
      case 'divisions':
        this.divisionService.getDivisions().subscribe(divisions => this.items = divisions);
        break;
      case 'document types':
        this.lookUpService.getLookUpsByObjectType('Document').subscribe(dtypes => this.items = dtypes);
        break;
      case 'facility types':
        this.lookUpService.getLookUpsByObjectType('Facility').subscribe(ftypes => this.items = ftypes);
        break;
      // case 'images':
      //   this.imageService.getImages().subscribe(images => this.items = images);
      //   break;
      case 'instrument types':
        this.lookUpService.getLookUpsByObjectType('Instrument').subscribe(itypes => this.items = itypes);
        break;
      case 'locations':
        this.locationService.getLocations().subscribe(locations => this.items = locations);
        this.bind_label = 'properties.name';
        break;
      case 'projects':
        this.projectService.getProjects().subscribe(projects => this.items = projects);
        break;
      case 'task types':
        this.lookUpService.getLookUpsByObjectType('Task').subscribe(ttypes => this.items = ttypes);
        break;
      case 'users':
        this.userService.getUsers().subscribe(users => this.items = users);
        this.bind_label = 'full_name';
        break;
      default:
        break;
    }

  }

  get isValid() { return this.form.controls[this.input.key].valid; }

  getInputClasses(input: any): { [key: string]: boolean } {
    return {
      'validationError': this.form.get(input.key)?.errors !== null,
    };
  }

  // ONLY for Image Preview  **************************************************
  onSelectChange(event: any): void {
    if (this.input.controlType !== 'image') { return; }
    // console.log(event.target.options[event.target.selectedIndex].text);
    // console.log(event.target.options[event.target.selectedIndex].value);
    this.updatePreview(event.target.options[event.target.selectedIndex].value);
  }

  private updatePreview(id: number) {
    if (id === 0) return; // prevents errors for 'Add' from where no image selected yet.

    this.imageService.getImageById(id).subscribe(img => {
      this.imagePreview = buildImageUrl(img?.image);
    });

  }
  // **************************************************************************

}
