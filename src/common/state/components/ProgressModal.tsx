import { Progress } from "../classes/Progress"
import { useObserver } from "mobx-react-lite"
import { PrimaryModal } from "../../../modules/modal/components/PrimaryModal"
import React from "react"
import { styled } from "../../../modules/theming/themes"
import { ProgressBar } from "./ProgressBar"

export type ProgressModalProps = {
  progress: Progress<any>
}

const Container = styled(PrimaryModal.Base)`
  min-width: 450px;
`

const PrimaryInfo = styled.div`
  margin-bottom: 16px;
  display: flex;

  justify-content: space-between;
`

const Message = styled.span`
  font-weight: 600;
`

const Percentage = styled.span``

export function ProgressModal(props: ProgressModalProps) {
  const { progress } = props

  return useObserver(() => (
    <Container>
      <PrimaryModal.Body>
        <PrimaryInfo>
          <Message>{progress.message}</Message>
          <Percentage>{Math.floor(progress.ratio * 100)}%</Percentage>
        </PrimaryInfo>
        <ProgressBar value={progress.ratio} />
      </PrimaryModal.Body>
    </Container>
  ))
}
