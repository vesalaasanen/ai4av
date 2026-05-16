---
spec_id: admin/christie-brio
schema_version: ai4av-public-spec-v1
revision: 1
title: "Christie Brio Control Spec"
manufacturer: Christie
model_family: Brio
aliases: []
compatible_with:
  manufacturers:
    - Christie
  models:
    - Brio
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - christiedigital.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-102207-08-christie-lit-man-ref-spyder-commands.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-000372-05-christie-e-series-serial-communications.pdf
retrieved_at: 2026-05-04T15:10:58.851Z
last_checked_at: 2026-05-14T21:45:07.155Z
generated_at: 2026-05-14T21:45:07.155Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T21:45:07.155Z
  matched_actions: 41
  action_count: 41
  confidence: high
  summary: "All 41 spec actions matched commands in source document with correct parameters and transport (TCP port 11135); full bidirectional coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# Christie Brio Control Spec

## Summary
Christie Brio is a meeting collaboration system controllable via Ethernet TCP socket on port 11135. ASCII command/response protocol. Commands terminate with carriage return; responses terminate with `>`. Security session commands exist but no login procedure documented.

<!-- UNRESOLVED: RS-232 serial connectivity not mentioned in source -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 11135
auth:
  type: none  # inferred: no login/auth procedure in source; security session commands require password only when issued
```

## Traits
```yaml
- powerable      # Restart, Shutdown commands present
- queryable      # GetMeetingStatus, GetSources, GetSourceStatus, GetAddressBook, GetPendingMeetingRequest, IsMultisiteMeetingInProgress present
- routable       # SwapSources, MoveSourceToPositionOne, MoveSourceToPositionTwo, MoveDviToPositionOne, MoveDviToPositionTwo present
```

## Actions
```yaml
- id: SetInfoVisibility
  label: Set Info Visibility
  kind: action
  params:
    - name: output
      type: string
      description: Which output displays Brio Info. Valid values: Primary, Secondary, Both, None

- id: Verbose
  label: Verbose
  kind: action
  params:
    - name: state
      type: string
      description: True/On/False/Off

- id: GetAddressBook
  label: Get Address Book
  kind: query
  params: []

- id: StartMeeting
  label: Start Meeting
  kind: action
  params:
    - name: brio_names
      type: string[]
      description: Names of Brio units to invite. Case sensitive.

- id: EndMeeting
  label: End Meeting
  kind: action
  params: []

- id: AcceptMeeting
  label: Accept Meeting
  kind: action
  params:
    - name: accept
      type: boolean
      description: true to accept, false to decline

- id: StartPresenting
  label: Start Presenting
  kind: action
  params: []

- id: AcceptPresenter
  label: Accept Presenter
  kind: action
  params:
    - name: accept
      type: boolean
      description: true to accept, false to decline

- id: IsMultisiteMeetingInProgress
  label: Is Multisite Meeting In Progress
  kind: query
  params: []

- id: GetMeetingStatus
  label: Get Meeting Status
  kind: query
  params: []

- id: GetPendingMeetingRequest
  label: Get Pending Meeting Request
  kind: query
  params: []

- id: AddMeetingGuests
  label: Add Meeting Guests
  kind: action
  params:
    - name: brio_names
      type: string[]
      description: Names of Brio units to add to meeting

- id: RemoveMeetingGuests
  label: Remove Meeting Guests
  kind: action
  params:
    - name: brio_names
      type: string[]
      description: Names of Brio units to remove from meeting

- id: StartSecurity
  label: Start Security Session
  kind: action
  params:
    - name: password
      type: string
      description: Password for security session. Case sensitive.
    - name: duration_minutes
      type: integer
      description: Duration in minutes. Maximum 1440.

- id: EndSecurity
  label: End Security Session
  kind: action
  params: []

- id: StartSecureSession
  label: Start Secure Session
  kind: action
  params: []

- id: GetSources
  label: Get Sources
  kind: query
  params: []

- id: GetSourceStatus
  label: Get Source Status
  kind: query
  params:
    - name: source_number
      type: integer
      description: Source number (1-based)

- id: SetSourceVisible
  label: Set Source Visible
  kind: action
  params:
    - name: source_number
      type: integer
      description: Source number
    - name: visible
      type: boolean
      description: true for visible, false for hidden

- id: SetSourceAudioOn
  label: Set Source Audio On
  kind: action
  params:
    - name: source_number
      type: integer
      description: Source number
    - name: audio_on
      type: boolean
      description: true for audio on, false for off

- id: RotateSources
  label: Rotate Sources
  kind: action
  params: []

- id: SwapSources
  label: Swap Sources
  kind: action
  params:
    - name: position_a
      type: integer
      description: First source position to swap
    - name: position_b
      type: integer
      description: Second source position to swap

- id: DisconnectSource
  label: Disconnect Source
  kind: action
  params:
    - name: source_number
      type: integer
      description: Source number to disconnect

- id: MoveSourceToPositionOne
  label: Move Source to Position One
  kind: action
  params:
    - name: source_number
      type: integer
      description: Source number to move
    - name: exclusive
      type: boolean
      description: True moves source and makes it only visible source

- id: MoveSourceToPositionTwo
  label: Move Source to Position Two
  kind: action
  params:
    - name: source_number
      type: integer
      description: Source number to move
    - name: exclusive
      type: boolean
      description: True moves source and makes it only visible source

- id: MoveDviToPositionOne
  label: Move DVI to Position One
  kind: action
  params:
    - name: dvi_type
      type: string
      description: DVI type: A or B
    - name: exclusive
      type: boolean
      description: True moves source and makes it only visible source

- id: MoveDviToPositionTwo
  label: Move DVI to Position Two
  kind: action
  params:
    - name: dvi_type
      type: string
      description: DVI type: A or B
    - name: exclusive
      type: boolean
      description: True moves source and makes it only visible source

- id: ToggleSourceVisibility
  label: Toggle Source Visibility
  kind: action
  params:
    - name: source_number
      type: integer
      description: Source number

- id: ToggleAudio
  label: Toggle Audio
  kind: action
  params:
    - name: source_number
      type: integer
      description: Source number

- id: SetDuplicatePrimary
  label: Set Duplicate Primary
  kind: action
  params:
    - name: duplicate
      type: boolean
      description: true to show source #1 on both outputs

- id: SetPrimaryOutput
  label: Set Primary Output
  kind: action
  params:
    - name: output
      type: string
      description: "A" or "B". Persistent through reboots.

- id: Restart
  label: Restart
  kind: action
  params: []

- id: Shutdown
  label: Shutdown
  kind: action
  params: []

- id: ToggleAutoShow
  label: Toggle Auto Show
  kind: action
  params: []

- id: SetAutoShow
  label: Set Auto Show
  kind: action
  params:
    - name: auto_show
      type: boolean
      description: true to auto-display connecting source

- id: SetAutoAcceptMeetingRequests
  label: Set Auto Accept Meeting Requests
  kind: action
  params:
    - name: auto_accept
      type: boolean
      description: true to auto-accept meeting requests. Persistent through reboots.

- id: StartWhiteboard
  label: Start Whiteboard
  kind: action
  params: []

- id: EndWhiteboard
  label: End Whiteboard
  kind: action
  params: []

- id: ClearWhiteboard
  label: Clear Whiteboard
  kind: action
  params: []

- id: StartAnnotation
  label: Start Annotation
  kind: action
  params: []

- id: EndAnnotation
  label: End Annotation
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: result_code
  type: enum
  values:
    - Success
    - Empty
    - InvalidCommand
    - InvalidArgCount
    - InvalidArgValue
    - Execution

- id: meeting_role
  type: enum
  values:
    - HostPresenting
    - HostViewing
    - Guest
    - Presenter
    - None

- id: pending_request_type
  type: enum
  values:
    - None
    - Invitation
    - GuestRequestingToPresent
    - HostRequestingGuestToPresent
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters found; all config via actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented; device only responds to commands
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Commands are ASCII, case insensitive, terminated by carriage return (`\r`), responses end with `>`
- Multi-argument last field can be repeated (e.g., `StartMeeting site1 site2 site3`)
- Optional arguments are marked with asterisk in source; no further arguments permitted after optional
- String spaces must be encoded as `%20` in commands
- `>` character in responses encoded as `&gt;`
- Response delimiter is ASCII space; multiple values returned space-separated
- Security session: `StartSecurity` requires password + duration; `StartSecureSession` auto-generates non-expiring password returned in response
- `SetPrimaryOutput` and `SetAutoAcceptMeetingRequests` persist through reboots
- `ClearWhiteboard` not supported during meetings
- Verbose mode modifies response format to: `commandName commandResult: [returnValues] >`
<!-- UNRESOLVED: serial/RS-232 not mentioned in source; protocol supports TCP only -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: TCP keepalive/heartbeat timing not stated in source -->

## Provenance

```yaml
source_domains:
  - christiedigital.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-102207-08-christie-lit-man-ref-spyder-commands.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-000372-05-christie-e-series-serial-communications.pdf
retrieved_at: 2026-05-04T15:10:58.851Z
last_checked_at: 2026-05-14T21:45:07.155Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T21:45:07.155Z
matched_actions: 41
action_count: 41
confidence: high
summary: "All 41 spec actions matched commands in source document with correct parameters and transport (TCP port 11135); full bidirectional coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
